import React, { useRef, useState } from 'react';
import './App.css';

function App() {
  const [valueAx, setValueAx] = useState('44');
  const [valueBx, setValueBx] = useState('16');
  const [valueCx, setValueCx] = useState('18');
  const [valueAy, setValueAy] = useState('78');
  const [valueBy, setValueBy] = useState('38');
  const [valueCy, setValueCy] = useState('64');
  const axRef = useRef<HTMLInputElement>(null)
  const bxRef = useRef<HTMLInputElement>(null)
  const cxRef = useRef<HTMLInputElement>(null)
  const ayRef = useRef<HTMLInputElement>(null)
  const byRef = useRef<HTMLInputElement>(null)
  const cyRef = useRef<HTMLInputElement>(null)
  const fieldInputRef = useRef<HTMLDivElement>(null)
  const fieldSvgRef = useRef<HTMLDivElement>(null)
  const [allCoordsError, setAllCoordsError] = useState(false)

  function addCoords() {
    if (fieldInputRef.current && fieldSvgRef.current && axRef.current && bxRef.current && cxRef.current && ayRef.current && byRef.current && cyRef.current && axRef.current.value && bxRef.current.value && cxRef.current.value && ayRef.current.value && byRef.current.value && cyRef.current.value) {
      setAllCoordsError(false)
      const fieldInput: HTMLDivElement = fieldInputRef.current
      const fieldSvg: HTMLDivElement = fieldSvgRef.current

      const ax = +axRef.current.value
      const bx = +bxRef.current.value
      const cx = +cxRef.current.value
      const ay = +ayRef.current.value
      const by = +byRef.current.value
      const cy = +cyRef.current.value

      const height = Math.abs((cy - by) * ax + (bx - cx) * ay + (cx * by - bx * cy)) / Math.sqrt((cy - by) ** 2 + (bx - cx) ** 2)
      const AB = Math.sqrt((bx - ax) ** 2 + (by - ay) ** 2)
      const BC = Math.sqrt((cx - bx) ** 2 + (cy - by) ** 2)
      const AC = Math.sqrt((cx - ax) ** 2 + (cy - ay) ** 2)
      const area = +(0.5 * height * BC).toFixed(2)
      fieldInput.innerHTML = `
      Coord A (x:${ax} y:${ay}) <br/>
      Coord B (x:${bx} y:${by}) <br/>
      Coord C (x:${cx} y:${cy}) <br/>
      <p>Area: ${area}</p>
      `

      let scale = 1
      const svgWidth = fieldSvg.clientWidth
      const svgHeight = fieldSvg.clientHeight
      while (Math.max(AB * scale, BC * scale, AC * scale) < svgHeight * 2 / 3) {
        scale += 0.1
      }
      while (Math.max(AB * scale, BC * scale, AC * scale) > svgHeight * 2 / 3) {
        scale -= 0.1
      }

      const factOX = (ax + bx + cx) / 3
      const factOY = (ay + by + cy) / 3

      const relOX = svgWidth / 2 / scale
      const relOY = svgHeight / 2 / scale

      const vectorX = relOX - factOX
      const vectorY = relOY - factOY

      fieldSvg.innerHTML = `
      <svg style="transform:scale(${scale}) translate(${(((svgWidth * scale - svgWidth) / scale / 2) / scale)}px,${(((svgHeight * scale - svgHeight) / scale / 2) / scale)}px);" height="${(100 / scale)}%" width="${(100 / scale)}%">
      <text style="transform:scale(${(1 / scale)})" x=${(ax * scale + scale + vectorX * scale)} y=${(ay * scale - scale + vectorY * scale)} fill="rgb(0,0,255)">A</text>
      <line x1=${(bx + vectorX)} y1=${(by + vectorY)} x2=${(cx + vectorX)} y2=${(cy + vectorY)} style="stroke:rgb(255,0,0);stroke-width:1" />
      <text style="transform:scale(${(1 / scale)})" x=${(bx * scale + scale + vectorX * scale)} y=${(by * scale - scale + vectorY * scale)} fill="rgb(0,0,255)">B</text>
      <line x1=${(ax + vectorX)} y1=${(ay + vectorY)} x2=${(bx + vectorX)} y2=${(by + vectorY)} style="stroke:rgb(255,0,0);stroke-width:1" />
      <text style="transform:scale(${(1 / scale)})" x=${(cx * scale + scale + vectorX * scale)} y=${(cy * scale - scale + vectorY * scale)} fill="rgb(0,0,255)">C</text>
      <line x1=${(ax + vectorX)} y1=${(ay + vectorY)} x2=${(cx + vectorX)} y2=${(cy + vectorY)} style="stroke:rgb(255,0,0);stroke-width:1" />
      </svg>
      `
    } else {
      setAllCoordsError(true)
    }
  }
  return (
    <div className='h-screen'>
      <header className="text-center bg-blue-500 text-white py-2 font-bold tracking-wider">Area calculator</header>
      <div className='my-5 mx-10'>
        A: <input ref={axRef} placeholder='coord A x' onChange={v => { setValueAx(v.target.value); addCoords() }} value={valueAx} type="number" className='border-[3px] border-black ml-3 mr-1' />
        <input ref={ayRef} placeholder='coord A y' onChange={v => { setValueAy(v.target.value); addCoords() }} value={valueAy} type="number" className='border-[3px] border-black ml-1 mr-10' />
        B: <input ref={bxRef} placeholder='coord B x' onChange={v => { setValueBx(v.target.value); addCoords() }} value={valueBx} type="number" className='border-[3px] border-black ml-3 mr-1' />
        <input ref={byRef} placeholder='coord B y' onChange={v => { setValueBy(v.target.value); addCoords() }} value={valueBy} type="number" className='border-[3px] border-black ml-1 mr-10' />
        C: <input ref={cxRef} placeholder='coord C x' onChange={v => { setValueCx(v.target.value); addCoords() }} value={valueCx} type="number" className='border-[3px] border-black ml-3 mr-1' />
        <input ref={cyRef} placeholder='coord C y' onChange={v => { setValueCy(v.target.value); addCoords() }} value={valueCy} type="number" className='border-[3px] border-black ml-1 mr-10' />
        {allCoordsError && <div className='inline mx-5 bg-red-600 text-white p-2'>Fill in all the fields!!!</div>}
      </div>
      <div className='mx-10 border h-96 flex'>
        <div ref={fieldInputRef} className='border w-auto inline-block p-3 [&>p]:py-3'>
          Coord A (x:44 y:78) <br />
          Coord B (x:16 y:38) <br />
          Coord C (x:18 y:64) <br />
          <p>Area: 324</p>
        </div>

        <div ref={fieldSvgRef} className='block flex-auto relative'>
          <svg style={{ transform: "scale(5.199999999999998) translate(130.39571005917162px,29.66715976331362px)" }} height="19.230769230769237%" width="19.230769230769237%">
            <text style={{ transform: "scale(0.19230769230769237)" }} x="938.2999999999998" y="279.4" fill="rgb(0,0,255)">A</text>
            <line x1="151.44230769230774" y1="14.73076923076924" x2="153.44230769230774" y2="40.73076923076924" style={{ stroke: "rgb(255,0,0)" }}></line>
            <text style={{ transform: "scale(0.19230769230769237)" }} x="792.6999999999999" y="71.40000000000003" fill="rgb(0,0,255)">B</text>
            <line x1="179.44230769230774" y1="54.73076923076924" x2="151.44230769230774" y2="14.73076923076924" style={{ stroke: "rgb(255,0,0)" }}></line>
            <text style={{ transform: "scale(0.19230769230769237)" }} x="803.0999999999999" y="202.70000000000002" fill="rgb(0,0,255)">C</text>
            <line x1="179.44230769230774" y1="54.73076923076924" x2="153.44230769230774" y2="40.73076923076924" style={{ stroke: "rgb(255,0,0)" }}></line>
          </svg>
        </div>

      </div>
    </div>
  );
}

export default App;
