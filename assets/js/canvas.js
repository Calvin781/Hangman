function drawHangedman(life) {

   

    ctx.fillStyle = "black";
    ctx.fillRect(0, 140, 150, 10);
    ctx.fillRect(50, 10, 10, 130);

    ctx.fillRect(0, 10, 250, 8);
    ctx.fillRect(175, 10, 10, 25);

    if (life < 6) {
        ctx.beginPath();
        ctx.arc(180, 45, 13, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = "white";

        ctx.beginPath();
        ctx.arc(175, 45, 2, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(185, 45, 2, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = "black";
        
    }

    if (life < 5) {
        ctx.fillRect(177, 50, 7, 40);
    }

    if (life < 4) {
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(177, 70);
        ctx.lineTo(160, 65);
        ctx.stroke();
 
    }

    if (life < 3) {
        ctx.beginPath();
        ctx.moveTo(177, 72);
        ctx.lineTo(200, 65);
        ctx.stroke();
    }

    if (life < 2) {
        ctx.beginPath();
        ctx.moveTo(178, 90);
        ctx.lineTo(200, 100);
        ctx.stroke();
    }

    if (life < 1) {
        ctx.beginPath();
        ctx.moveTo(179, 90);
        ctx.lineTo(160, 100);
        ctx.stroke();

        document.getElementById("restart").style.display = "block";
    }
}