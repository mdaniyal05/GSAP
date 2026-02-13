(function () {
  const canvas = document.getElementById("ballCanvas");
  const ctx = canvas.getContext("2d");

  const w = 500,
    h = 300;

  const ball = {
    x: 150,
    y: 80,
    scaleX: 1.0,
    scaleY: 1.0,
    rotation: 0,
    shadowSize: 12,
  };

  const FLOOR_Y = 240;
  const INIT_X = 150,
    INIT_Y = 80;

  function drawBall() {
    ctx.clearRect(0, 0, w, h);

    const shadowBlur = Math.max(6, ball.shadowSize * 1.2);
    const shadowYOffset = Math.min(12, 6 + (ball.y - 80) * 0.1);
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = shadowBlur;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 8;
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.beginPath();
    ctx.strokeStyle = "#3e506e";
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 12]);
    ctx.beginPath();
    ctx.moveTo(30, FLOOR_Y);
    ctx.lineTo(w - 30, FLOOR_Y);
    ctx.stroke();
    ctx.setLineDash([]);

    const ballX = ball.x;
    const ballY = ball.y;

    ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
    ctx.shadowBlur = 16;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 6;

    ctx.beginPath();

    ctx.translate(ballX, ballY);
    ctx.rotate(ball.rotation);
    ctx.scale(ball.scaleX, ball.scaleY);

    const gradient = ctx.createRadialGradient(-8, -8, 6, 0, 0, 32);
    gradient.addColorStop(0, "#ffd966");
    gradient.addColorStop(0.5, "#f7b731");
    gradient.addColorStop(1, "#cc7b1f");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, 28, 0, 2 * Math.PI);
    ctx.fill();

    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(-8, -10, 8, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
    ctx.fill();

    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }

  gsap.ticker.add(drawBall);

  let mainTimeline = gsap.timeline({ paused: true });

  function buildTimeline() {
    if (mainTimeline) mainTimeline.kill();
    mainTimeline = gsap.timeline({
      repeat: 2,
      repeatDelay: 0.1,
      yoyo: false,
      ease: "none",
      onUpdate: function () {},
    });

    mainTimeline
      .to(ball, {
        y: FLOOR_Y - 2,
        scaleX: 1.02,
        scaleY: 0.88,
        rotation: 0.2,
        shadowSize: 10,
        duration: 0.4,
        ease: "power1.in",
      })
      .to(ball, {
        y: FLOOR_Y + 4,
        scaleX: 1.25,
        scaleY: 0.7,
        rotation: 0.1,
        shadowSize: 4,
        duration: 0.08,
        ease: "none",
      })
      .to(ball, {
        y: FLOOR_Y - 6,
        scaleX: 0.95,
        scaleY: 1.1,
        rotation: -0.1,
        shadowSize: 14,
        duration: 0.1,
        ease: "none",
      })
      .to(ball, {
        y: 100,
        scaleX: 1.0,
        scaleY: 1.0,
        rotation: -0.3,
        shadowSize: 18,
        duration: 0.5,
        ease: "power2.out",
      })
      .to(ball, {
        y: FLOOR_Y - 4,
        scaleX: 1.03,
        scaleY: 0.92,
        rotation: -0.1,
        shadowSize: 12,
        duration: 0.35,
        ease: "power1.in",
      })
      .to(ball, {
        y: FLOOR_Y + 3,
        scaleX: 1.18,
        scaleY: 0.75,
        rotation: 0.05,
        shadowSize: 5,
        duration: 0.07,
        ease: "none",
      })
      .to(ball, {
        y: FLOOR_Y - 5,
        scaleX: 0.97,
        scaleY: 1.07,
        rotation: 0.15,
        shadowSize: 13,
        duration: 0.1,
        ease: "none",
      })
      .to(ball, {
        y: 130,
        scaleX: 1.0,
        scaleY: 1.0,
        rotation: 0.25,
        shadowSize: 16,
        duration: 0.4,
        ease: "power2.out",
      })
      .to(ball, {
        y: FLOOR_Y - 3,
        scaleX: 1.02,
        scaleY: 0.95,
        rotation: 0.1,
        shadowSize: 12,
        duration: 0.3,
        ease: "power1.in",
      })
      .to(ball, {
        y: FLOOR_Y + 2,
        scaleX: 1.1,
        scaleY: 0.82,
        rotation: 0.0,
        shadowSize: 6,
        duration: 0.06,
        ease: "none",
      })
      .to(ball, {
        y: FLOOR_Y - 2,
        scaleX: 0.98,
        scaleY: 1.04,
        rotation: -0.05,
        shadowSize: 12,
        duration: 0.1,
        ease: "none",
      })
      .to(ball, {
        y: 150,
        scaleX: 1.0,
        scaleY: 1.0,
        rotation: -0.1,
        shadowSize: 14,
        duration: 0.3,
        ease: "power2.out",
      })
      .to(ball, {
        x: 320,
        rotation: 0.8,
        scaleX: 1.0,
        scaleY: 1.0,
        shadowSize: 12,
        duration: 1.2,
        ease: "power1.inOut",
      });
  }

  buildTimeline();

  document.getElementById("bounceBtn").addEventListener("click", () => {
    mainTimeline.restart();
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    mainTimeline.pause();
    gsap.to(ball, {
      x: INIT_X,
      y: INIT_Y,
      scaleX: 1.0,
      scaleY: 1.0,
      rotation: 0,
      shadowSize: 12,
      duration: 0.4,
      ease: "power2.out",
      onComplete: () => {
        buildTimeline();
      },
    });
  });

  canvas.addEventListener("click", () => {
    mainTimeline.restart();
  });

  drawBall();
})();
