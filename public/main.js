const form = document.getElementById('votos');
form.addEventListener('submit',(e)=>{
  const choice = document.querySelector('input[name=os]:checked').value;
  const data = {os: choice};

  fetch('https://enquetemap.herokuapp.com/enquete',{
    method: 'post',
    body: JSON.stringify(data),
    headers: new Headers({
        'Content-type': 'application/json'
    })
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
  
        document.getElementById("btn").disabled = true;
        localStorage.setItem("gazeta2","gazeta2");
        location.reload();

    e.preventDefault();
});

fetch('https://enquetemap.herokuapp.com/enquete')
    .then(res => res.json())
    .then(data => {
        const votes = data.votes;
        const totalVotes = votes.length;
        
        const voteCounts = votes.reduce((acc,vote) => ((acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)),acc),{});
        const votoA = (voteCounts.A);
        const votoB = (voteCounts.B);
        //const votoC = (voteCounts.C);
  
        const votePerA = (votoA * 100)/totalVotes ;
        const votePerB = (votoB * 100)/totalVotes ;
        //const votePerC = (votoC * 100)/totalVotes ;

        let votosA = votePerA.toFixed(2);
        let votosB =votePerB.toFixed(2);
        //let votosC = votePerC.toFixed(2);
  
        if(voteCounts.A === undefined){voteCounts.A = 0; votosA = 0};
        if(voteCounts.B === undefined){voteCounts.B = 0; votosB = 0};
        //if(voteCounts.C === undefined){voteCounts.C = 0; votosC = 0};
  
        let dataPoints = [
            //{label : `C: ${votosC}%`, y:votoC, color: "#FFEE00"},
            {label : `B: ${votosB}%`, y:votoB, color: "#C24642"},
            {label : `A: ${votosA}%`, y:votoA, color: "#0F68AB"}
        ];
        
        const chartContainer = document.querySelector('#chartContainer');
        
        if (chartContainer){
            const chart = new CanvasJS.Chart('chartContainer',{
                animationEnable: true,
                theme: 'theme1',
                title:{
                    text: `Total de Votos: ${voteCounts.A + voteCounts.B /*+ voteCounts.C*/}`,
                    fontSize: 20,
                    fontColor: "black",
                },
                axisX:{
                    labelFontSize: 20,
                    labelFontColor: "black",
                    labelFontStyle: "bold"
                  },
                data:[
                    {
                        type: 'bar',
                        dataPoints:dataPoints
                    }
                ]
            });
            chart.render();
            Pusher.logToConsole = true;
        
            var pusher = new Pusher('cfa4b06555370ffa6124', {
              cluster: 'sa1',
              useTLS: true
            });
        
            var channel = pusher.subscribe('enquete');
            channel.bind('votacao', function(data) {
              dataPoints = dataPoints.map(x =>{
                if(x.label == data.os){
                    x.y += data.points;
                    return x;
                }else{
                    return x;
                }
              })
              chart.render();
            });
        }
    });



