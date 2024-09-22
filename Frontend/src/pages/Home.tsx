import { useEffect, useRef, useState } from 'react';
import { colors } from '@/constants';
import { ColorSwatch, Button } from '@mantine/core';
import axios from 'axios';

const Home = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState(colors[0]);
    const [reset, setReset] = useState(false);
    const [generatedResult, setGeneratedResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (reset) {
            resetCanvas();
            setReset(false);
        }
    }, [reset]);

    const resetCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                canvas.style.backgroundColor = 'black';
                ctx.strokeStyle = color;
                ctx.lineJoin = 'round';
                ctx.lineCap = 'round';
                ctx.lineWidth = 2;
            }
        }
    }, []);

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.beginPath();
                ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                setIsDrawing(true);
            }
        }
    };

    const finishDrawing = () => {
        setIsDrawing(false);
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) {
            return;
        }
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.strokeStyle = color;
                ctx.lineWidth = 2;
                ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                ctx.stroke();
            }
        }
    };

    const sendData = async () => {
        const canvas = canvasRef.current;
        if (canvas) {
            setLoading(true);
            try {
                const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/calculate`, {
                    data: {
                        image: canvas.toDataURL('image/png'),
                    }
                });
                const res = await response.data;
                setGeneratedResult(res.result);
                console.log(generatedResult);
                clearAndDisplayResult(res.result); // clear canvas and show the result
            } catch (error) {
                console.error('Error calculating:', error);
                setGeneratedResult('An error occurred while processing the image.');
            } finally {
                setLoading(false);
                console.log(loading);
                
            }
        }
    };

    const clearAndDisplayResult = (text: string) => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                // Clear the entire canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Set a larger, bold font for displaying the result
                ctx.font = 'bold 30px Arial';
                ctx.fillStyle = 'white';

                // Calculate the position to center the text
                const textMetrics = ctx.measureText(text);
                const textX = (canvas.width - textMetrics.width) / 2;
                const textY = (canvas.height + 30) / 2; // Adjust for vertical centering

                // Draw the result text in the center of the canvas
                ctx.fillText(text, textX, textY);
            }
        }
    };

    return (
        <>
            <div className="w-full grid grid-cols-3 gap-4 p-2">
                <Button onClick={() => setReset(true)} className="z-20 bg-black text-white">
                    Reset
                </Button>
                <div className="z-20 flex justify-around w-[20vw] m-auto">
                    {colors.map((color: string, index: number) => (
                        <ColorSwatch
                            key={index}
                            color={color}
                            onClick={() => setColor(color)}
                            className="cursor-pointer"
                        />
                    ))}
                </div>
                <Button onClick={sendData} className="z-20 bg-black text-white">
                    Calculate
                </Button>
            </div>

            <canvas
                ref={canvasRef}
                id="canvas"
                className="absolute top-0 left-0 w-full h-full"
                onMouseDown={startDrawing}
                onMouseOut={finishDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
            ></canvas>
        </>
    );
};

export default Home;
