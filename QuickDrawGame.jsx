import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Timer } from "lucide-react";

const objects = ["cat", "house", "car", "tree", "star"];

export default function QuickDrawGame() {
  const [objectToDraw, setObjectToDraw] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setObjectToDraw(objects[Math.floor(Math.random() * objects.length)]);
    setTimeLeft(10);
    setIsPlaying(true);
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const draw = (event) => {
    if (!isPlaying) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(event.nativeEvent.offsetX, event.nativeEvent.offsetY, 3, 0, Math.PI * 2);
    ctx.fill();
  };

  return (
    <div className="flex flex-col items-center p-4">
      <Card className="p-4 w-96 text-center">
        <h2 className="text-xl font-bold">Quick Draw!</h2>
        <p>Draw: {objectToDraw}</p>
        <div className="flex items-center gap-2">
          <Timer /> <span>{timeLeft}s</span>
        </div>
        <canvas ref={canvasRef} width={300} height={300} className="border mt-2" onMouseMove={draw}></canvas>
        <Button className="mt-2" onClick={startGame} disabled={isPlaying}>
          {isPlaying ? "Drawing..." : "Start"}
        </Button>
      </Card>
    </div>
  );
}
