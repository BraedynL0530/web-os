import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Rect, Text, Circle, Line, Transformer, Ellipse } from 'react-konva';


const Whiteboard = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [activeTool, setActiveTool] = useState('draw');
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const stageRef = useRef();
  const transformerRef = useRef();
  const layerRef = useRef();
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);


  useEffect(() => {
    const stage = layerRef.current?.getStage();
    const selectedNode = selectedId ? stage?.findOne(`#${selectedId}`) : null;

    if (transformerRef.current) {
      if (selectedNode) {
        transformerRef.current.nodes([selectedNode]);
      } else {
        transformerRef.current.nodes([]);
      }
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedId, elements]);

  const addRect = () => {
    const newRect = {
      id: Date.now(),
      type: 'rect',
      x: 50,
      y: 50,
      width: 100,
      height: 60,
      fill: 'red',
    };
    setElements([...elements, newRect]);
  };

  const addCircle = () => {
    const newCircle = {
      id: Date.now(),
      type: 'circle',
      x: 50,
      y: 50,
      radius: 40,
      fill: 'red',
    };
    setElements([...elements, newCircle]);
  };

  const addEllipse = () => {
    const newEllipse = {
      id: Date.now(),
      type: 'ellipse',
      x: 50,
      y: 50,
      radiusX: 60,
      radiusY: 40,
      fill: 'red',
    };
    setElements([...elements, newEllipse]);
  };

  const handleMouseDown = (e) => {
    const pos = stageRef.current.getPointerPosition();

    if (activeTool === 'draw' || activeTool === 'erase') {
      setLines([
        ...lines,
        {
          points: [pos.x, pos.y],
          tool: activeTool,
        },
      ]);
      setIsDrawing(true);
    }
  };

  const handleStageMouseDown = (e) => {
    const clickedEmpty = e.target === e.target.getStage();

    if (clickedEmpty) {
      setSelectedId(null);
    }

    if (activeTool === 'draw' || activeTool === 'erase') {
      handleMouseDown(e);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !stageRef.current) return;

    const stage = stageRef.current.getStage();
    const point = stage.getPointerPosition();
    if (!point) return;

    const lastLine = lines[lines.length - 1];
    if (!lastLine) return;

    const newPoints = lastLine.points.concat([point.x, point.y]);
    const newLines = lines.slice(0, -1).concat({
      ...lastLine,
      points: newPoints,
    });
    setLines(newLines);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const stageHeight = dimensions.height - 100;

  return (
    <>
      <div style={{ height: 100, backgroundColor: '#eee', padding: '10px' }}>
        <button onClick={addRect}>Add Rectangle</button>
        <button onClick={addCircle}>Add Circle</button>
        <button onClick={addEllipse}>Add Ellipse</button>
        <button onClick={() => setActiveTool('draw')}>✏️ Draw</button>
        <button onClick={() => setActiveTool('erase')}>🧽 Erase</button>
        <button onClick={() => setActiveTool('text')}>T Text</button>
        <h1>Whiteboard Header</h1>
      </div>
      <Stage
        width={dimensions.width}
        height={stageHeight}
        ref={stageRef}
        onMouseDown={handleStageMouseDown}
        onMouseMove={['draw', 'erase'].includes(activeTool) ? handleMouseMove : undefined}
        onMouseUp={['draw', 'erase'].includes(activeTool) ? handleMouseUp : undefined}
      >
        <Layer ref={layerRef}>
          <Rect
            x={0}
            y={0}
            width={dimensions.width}
            height={stageHeight}
            stroke="black"
            strokeWidth={3}
            listening={false}
          />
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.tool === 'erase' ? 'white' : 'black'}
              strokeWidth={2}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === 'erase' ? 'destination-out' : 'source-over'
              }
            />
          ))}

          <Text text="Try to drag shapes" fontSize={15} />
          {elements.map(el => {
            switch (el.type) {
              case 'rect':
                return (
                  <Rect
                    key={el.id}
                    id={el.id.toString()}
                    x={el.x}
                    y={el.y}
                    width={el.width}
                    height={el.height}
                    fill={el.fill}
                    draggable
                    onTransformEnd={(e) => {
                      const node = e.target;
                      const scaleX = node.scaleX();
                      const scaleY = node.scaleY();

                      const updated = elements.map(item => {
                        if (item.id === el.id) {
                          return {
                            ...item,
                            x: node.x(),
                            y: node.y(),
                            width: node.width() * scaleX,
                            height: node.height() * scaleY,
                            rotation: node.rotation(),
                          };
                        }
                        return item;
                      });

                      setElements(updated);
                      node.scaleX(1);
                      node.scaleY(1);
                    }}
                    onDragEnd={e => {
                      const { x, y } = e.target.position();
                      setElements(elements.map(item => item.id === el.id ? { ...item, x, y } : item));
                    }}
                    onClick={() => setSelectedId(el.id)}
                  />
                );
              case 'circle':
                return (
                  <Circle
                    key={el.id}
                    id={el.id.toString()}
                    x={el.x}
                    y={el.y}
                    radius={el.radius}
                    fill={el.fill}
                    draggable
                    onTransformEnd={(e) => {
                      const node = e.target;
                      const scaleX = node.scaleX();

                      const updated = elements.map(item => {
                        if (item.id === el.id) {
                          return {
                            ...item,
                            x: node.x(),
                            y: node.y(),
                            radius: el.radius * scaleX,
                            rotation: node.rotation(),
                          };
                        }
                        return item;
                      });

                      setElements(updated);
                      node.scaleX(1);
                      node.scaleY(1);
                    }}
                    onDragEnd={e => {
                      const { x, y } = e.target.position();
                      setElements(elements.map(item => item.id === el.id ? { ...item, x, y } : item));
                    }}
                    onClick={() => setSelectedId(el.id)}
                  />
                );
              case 'ellipse':
                return (
                  <Ellipse
                    key={el.id}
                    id={el.id.toString()}
                    x={el.x}
                    y={el.y}
                    radiusX={el.radiusX}
                    radiusY={el.radiusY}
                    fill={el.fill}
                    draggable
                    onTransformEnd={(e) => {
                      const node = e.target;
                      const scaleX = node.scaleX();
                      const scaleY = node.scaleY();

                      const updated = elements.map(item => {
                        if (item.id === el.id) {
                          return {
                            ...item,
                            x: node.x(),
                            y: node.y(),
                            radiusX: el.radiusX * scaleX,
                            radiusY: el.radiusY * scaleY,
                            rotation: node.rotation(),
                          };
                        }
                        return item;
                      });

                      setElements(updated);
                      node.scaleX(1);
                      node.scaleY(1);
                    }}
                    onDragEnd={e => {
                      const { x, y } = e.target.position();
                      setElements(elements.map(item => item.id === el.id ? { ...item, x, y } : item));
                    }}
                    onClick={() => setSelectedId(el.id)}
                  />
                );
              default:
                return null;
            }
          })}
          <Transformer ref={transformerRef} />
        </Layer>
      </Stage>
    </>
  );
};

export default Whiteboard;