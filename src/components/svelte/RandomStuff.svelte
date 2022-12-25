
<script>
    import { onMount } from 'svelte';
    import 'chota';
    import { Container, Button, Card, Row, Col } from 'svelte-chota';

    let classList = [];
    let playedVideo = [];
    let historyArray = [];

    onMount(async () => {
		getData();

        let localData = JSON.parse(localStorage.getItem("record"));
        if (localData !== null) {
            historyArray = [...localData];
            // genHistory();
        }
	});

    async function getData(){
        let res = await fetch("https://cdn.jsdelivr.net/gh/r48n34/r48n34.github.io@main/public/songWebText.txt")
        let result = await res.text();

        let videoList = result.split("\n");
        for (let i = 0; i < videoList.length; i += 2) {
            classList.push({
                webName: videoList[i], 
                webUrl:  videoList[i + 1]
            });
        }

        classList = classList
    }

    async function goRandom() {
        while(true){

            let num = Math.floor(Math.random() * classList.length);
            let code = youTubeGetID(classList[num].webUrl);
            let isValidVdo = await validVideoId(code);
        
            if(isValidVdo){
                openVdo(classList[num]);
                break
            }

        }
    }

    function youTubeGetID(url) {
        url = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        return undefined !== url[2]
            ? url[2].split(/[^0-9a-z_\-]/i)[0]
            : url[0];
    }

    function validVideoId(videoId) {
        return new Promise( rec => {
            let img = new Image();
            img.src = "http://img.youtube.com/vi/" + videoId + "/mqdefault.jpg";
            img.onload = function () {
                rec(this.width != 120)
            };
        })
    }

    function openVdo(li) {
        let videoImg = "https://img.youtube.com/vi/" + youTubeGetID(li.webUrl) + "/0.jpg";

        window.open(li.webUrl, "_blank"); //Play video in a new windows

        playedVideo.push({
            ...li,
            videoImg
        });

        playedVideo = playedVideo

        console.log(playedVideo);

        historyArray.push(li);

    }

    if(typeof window === "object"){
        document.addEventListener("keyup", function (event) { 
            event.keyCode === 13 && goRandom();
        });
    }

</script>

<Container>

    <h1 style="text-align: center; font-size: 90px">Random Songs</h1>
    <h3 style="text-align: center;">
        Total video: ({ classList.length })
    </h3>

    <div style="text-align: center;">
        <Button secondary on:click={() => goRandom()}>
            Go random
        </Button>
    </div>

    <Row>
    {#each playedVideo as { webName, webUrl, videoImg }, i}
        <Col size="3">
        <Card>
            <a href={webUrl} target="_blank" rel="noreferrer">
                <img src={videoImg} width="230" height="auto" alt="img">
            </a>
            <h4 style="color: #000000">{webName}</h4>
        </Card>
        </Col>
    {/each} 
    </Row>

</Container>


<style>
    @import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css";

	:global(body) {
		/* this will apply to <body> */
		background-color: #181818;
        color: #FFFFFF;
        font-family: 'Roboto', sans-serif;
	}

</style>