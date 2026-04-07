import { useEffect, useRef, useState, useCallback } from "react";

const SHAPES = ["circle", "triangle", "square", "hexagon", "star", "diamond"];

// Only white/frost shades — each slightly different opacity & tone
const WHITE_PALETTE = [
  { fill: "rgba(255,255,255,0.06)", stroke: "rgba(255,255,255,0.32)", glow: "#dce8f5" },
  { fill: "rgba(220,232,248,0.08)", stroke: "rgba(200,220,242,0.38)", glow: "#c4d9f0" },
  { fill: "rgba(240,246,255,0.05)", stroke: "rgba(255,255,255,0.24)", glow: "#e8f0fa" },
  { fill: "rgba(210,225,245,0.07)", stroke: "rgba(195,215,238,0.30)", glow: "#bcd0ec" },
];

const SHAPE_COUNT = 4;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function createShape(id, canvasW, canvasH) {
  const type = SHAPES[Math.floor(Math.random() * SHAPES.length)];
  const color = WHITE_PALETTE[id % WHITE_PALETTE.length];
  const size = randomBetween(60, 130);
  return {
    id,
    type,
    color,
    size,
    x: randomBetween(size, canvasW - size),
    y: randomBetween(size, canvasH - size),
    vx: randomBetween(-0.4, 0.4) || 0.25,
    vy: randomBetween(-0.4, 0.4) || 0.25,
    rotation: randomBetween(0, 360),
    rotationSpeed: randomBetween(-0.25, 0.25),
    opacity: randomBetween(0.6, 1),
    pulsePhase: randomBetween(0, Math.PI * 2),
    hovered: false,
    scale: 1,
    targetScale: 1,
  };
}

function drawCircle(ctx, r) {
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

function drawTriangle(ctx, r) {
  ctx.beginPath();
  ctx.moveTo(0, -r);
  ctx.lineTo(r * 0.866, r * 0.5);
  ctx.lineTo(-r * 0.866, r * 0.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function drawSquare(ctx, r) {
  ctx.beginPath();
  ctx.rect(-r, -r, r * 2, r * 2);
  ctx.fill();
  ctx.stroke();
}

function drawHexagon(ctx, r) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    i === 0
      ? ctx.moveTo(r * Math.cos(angle), r * Math.sin(angle))
      : ctx.lineTo(r * Math.cos(angle), r * Math.sin(angle));
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function drawStar(ctx, r) {
  const inner = r * 0.45;
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const rd = i % 2 === 0 ? r : inner;
    i === 0
      ? ctx.moveTo(rd * Math.cos(angle), rd * Math.sin(angle))
      : ctx.lineTo(rd * Math.cos(angle), rd * Math.sin(angle));
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function drawDiamond(ctx, r) {
  ctx.beginPath();
  ctx.moveTo(0, -r);
  ctx.lineTo(r * 0.6, 0);
  ctx.lineTo(0, r);
  ctx.lineTo(-r * 0.6, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

const DRAW_FNS = {
  circle: drawCircle,
  triangle: drawTriangle,
  square: drawSquare,
  hexagon: drawHexagon,
  star: drawStar,
  diamond: drawDiamond,
};

function drawShape(ctx, shape, time) {
  ctx.save();
  ctx.translate(shape.x, shape.y);
  ctx.rotate((shape.rotation * Math.PI) / 180);

  const pulse = 1 + 0.05 * Math.sin(time * 0.0015 + shape.pulsePhase);
  ctx.scale(shape.scale * pulse, shape.scale * pulse);

  ctx.globalAlpha = shape.opacity;
  ctx.shadowColor = shape.color.glow;
  ctx.shadowBlur = shape.hovered ? 22 : 8;
  ctx.fillStyle = shape.color.fill;
  ctx.strokeStyle = shape.color.stroke;
  ctx.lineWidth = shape.hovered ? 2 : 1.2;

  DRAW_FNS[shape.type](ctx, shape.size / 2);
  ctx.restore();
}

export default function FloatingShapes() {
  const canvasRef = useRef(null);
  const shapesRef = useRef([]);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999, clicking: false });
  const [hoveredCount, setHoveredCount] = useState(0);

  const initShapes = useCallback((w, h) => {
    shapesRef.current = Array.from({ length: SHAPE_COUNT }, (_, i) =>
      createShape(i, w, h)
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initShapes(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const ctx = canvas.getContext("2d");

    const animate = (timestamp) => {
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      // Subtle grid
      ctx.save();
      ctx.strokeStyle = "rgba(255,255,255,0.025)";
      ctx.lineWidth = 0.5;
      for (let gx = 0; gx < W; gx += 80) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
      }
      for (let gy = 0; gy < H; gy += 80) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
      }
      ctx.restore();

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      let hCount = 0;

      shapesRef.current.forEach((shape) => {
        const dx = shape.x - mx;
        const dy = shape.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const interactRadius = 140;

        shape.hovered = dist < interactRadius;
        if (shape.hovered) hCount++;

        if (dist < interactRadius && dist > 0) {
          const force = ((interactRadius - dist) / interactRadius) * 0.011;
          if (mouseRef.current.clicking) {
            shape.vx -= (dx / dist) * force * 2.2;
            shape.vy -= (dy / dist) * force * 2.2;
          } else {
            shape.vx += (dx / dist) * force * 1.6;
            shape.vy += (dy / dist) * force * 1.6;
          }
          shape.targetScale = 1.3;
        } else {
          shape.targetScale = 1;
        }

        shape.scale += (shape.targetScale - shape.scale) * 0.08;

        const speed = Math.sqrt(shape.vx ** 2 + shape.vy ** 2);
        if (speed > 3) {
          shape.vx = (shape.vx / speed) * 3;
          shape.vy = (shape.vy / speed) * 3;
        }

        shape.vx *= 0.996;
        shape.vy *= 0.996;
        shape.x += shape.vx;
        shape.y += shape.vy;
        shape.rotation += shape.rotationSpeed;

        const pad = shape.size * 0.6;
        if (shape.x < pad) { shape.x = pad; shape.vx = Math.abs(shape.vx); }
        if (shape.x > W - pad) { shape.x = W - pad; shape.vx = -Math.abs(shape.vx); }
        if (shape.y < pad) { shape.y = pad; shape.vy = Math.abs(shape.vy); }
        if (shape.y > H - pad) { shape.y = H - pad; shape.vy = -Math.abs(shape.vy); }

        drawShape(ctx, shape, timestamp);
      });

      setHoveredCount(hCount);
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [initShapes]);

  const handleMouseMove = useCallback((e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  }, []);

  const handleMouseDown = useCallback(() => { mouseRef.current.clicking = true; }, []);
  const handleMouseUp = useCallback(() => { mouseRef.current.clicking = false; }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.x = -9999;
    mouseRef.current.y = -9999;
    mouseRef.current.clicking = false;
  }, []);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const touch = e.touches[0];
    mouseRef.current.x = touch.clientX - rect.left;
    mouseRef.current.y = touch.clientY - rect.top;
  }, []);

  const handleTouchEnd = useCallback(() => {
    mouseRef.current.x = -9999;
    mouseRef.current.y = -9999;
  }, []);

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 20% 30%, #0f1c3f 0%, #080d1e 40%, #050912 100%)",
        cursor: hoveredCount > 0 ? "crosshair" : "default",
      }}
    >
      {/* Ambient orbs — neutral white-blue tones only */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "600px", height: "600px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(180,200,230,0.05) 0%, transparent 70%)",
          top: "-150px", left: "-150px", filter: "blur(50px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,215,240,0.04) 0%, transparent 70%)",
          bottom: "-120px", right: "-80px", filter: "blur(60px)",
        }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />

     
    </div>
  );
}