import React, { useState, useEffect } from 'react';
import './App.sass';
import { Line, Doughnut, Bar, Bubble } from 'react-chartjs-2'
import { Dropdown, DropdownButton, Button, Modal, InputGroup, FormControl, Form, ListGroup } from 'react-bootstrap'

function App() {
  const [color, setColor] = useState('#FF5733');
  const [model, setModel] = useState('line')
  const [background, setBackground] = useState('transparent');
  const [backgroundList, setBackgroundList] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalTwo, setModalTwo] = useState(false);
  const [header, setHeader] = useState('Heavy Device Usage (8+ Hours a day)')
  const [axisWord, setAxisWord] = useState('');
  const [dataNum, setDataNum] = useState('');
  const [xAxis, setXAxis] = useState(['05/15', '05/22', '05/29', '06/05', '06/12', '06/19', '06/26', '07/03',
    '07/10', '07/17', '07/24', '07/31'])
  const [axisArray, setAxisArray] = useState([])
  const [dta, setData] = useState([30, 10, 31, 30, 29, 29, 40, 30, 30, 25, 80, 22])
  const [dataArray, setDataArray] = useState([])
  const [animation, setAnimation] = useState(1000);
  const [minMax, setMinMax] = useState({ min: 0, max: 100 });
  const [prefix, setPrefix] = useState('')
  const [suffix, setSuffix] = useState('')
  const [prefixSuffix, setPrefixSuffix] = useState({
    pre: '',
    suf: '%'
  })
  useEffect(() => {
    const backgrndClrsList = []
    for (let i = 0; i < data.datasets[0].data.length; i++) {
      let color = 'rgb(' +
        Math.floor(Math.random() * 255) + ',' +
        Math.floor(Math.random() * 255) + ',' +
        Math.floor(Math.random() * 255) + ')';
      backgrndClrsList.push(color);
    }
    setBackgroundList(backgrndClrsList)
  }, [])
  const data = {
    labels: xAxis,
    datasets: [{
      label: header,
      backgroundColor: `${background}`,
      borderWidth: 3,
      borderColor: `${color}`,
      rotaion: 20,
      data: dta
    }]
  }
  const options = {
    tooltips: {
      mode: "point"
    },
    scales: {
      yAxes: [{
        ticks: {
          suggestedMin: minMax.min,
          suggestedMax: minMax.max,
          callback: function (value) {
            return prefixSuffix.pre + value + prefixSuffix.suf;
          }
        }
      }]
    },
    animation: {
      duration: animation
    }
  }
  const handleColorSelect = ev => {
    if (ev === '1') {
      if (model === 'bar') {
        setBackground('#EBF5FB')
      }
      setColor('#85C1E9');
    } else if (ev === '2') {
      if (model === 'bar') {
        setBackground('#EAFAF1')
      }
      setColor('#58D68D');
    } else if (ev === '3') {
      if (model === 'bar') {
        setBackground('#FEF9E7')
      }
      setColor('#F4D03F ');
    } else if (ev === '4') {
      if (model === 'bar') {
        setBackground('#F8F9F9')
      }
      setColor('#909497 ');
    } else if (ev === '5') {
      if (model === 'bar') {
        setBackground('#F5EEF8')
      }
      setColor('#9B59B6');
    } else {
      if (model === 'bar') {
        setBackground('#FDEDEC')
      }
      setColor('#FF5733');
    }
  }
  const handleChartSelect = ev => {
    if (ev === '1') {
      setModel('bar');
      setBackground('#FDEDEC')
      setColor('#FF5733')
    } else if (ev === '2') {
      setModel('pie')
    } else if (ev === '3') {
      setModel('bubble')
    } else {
      setModel('line');
      setBackground('transparent')
    }
  }
  const handleDataChange = () => {
    setAnimation(0)
    setModal(true)
  }
  const handleClose = () => {
    setAnimation(1000)
    setModal(false)
  }
  const handleHeader = ev => {
    setHeader(ev.target.value);
  }
  const handleCustomize = () => {
    setXAxis(axisArray)
    setPrefixSuffix({
      pre: prefix,
      suf: suffix
    })
    setData(dataArray);
    handleClose();
    setAxisArray([])
    setDataArray([])
  }
  const handleXAxis = ev => {
    setAxisWord(ev.target.value);
  }
  const handleXAxisAdd = () => {
    setAxisArray([...axisArray, axisWord])
  }
  const handleRangeSelect = evt => {
    if (evt === '1-10') {
      setMinMax({
        min: 1,
        max: 10
      })
    } else if (evt === '1-20') {
      setMinMax({
        min: 1,
        max: 20
      })
    } else if (evt === '1-40') {
      setMinMax({
        min: 1,
        max: 40
      })
    } else if (evt === '1-50') {
      setMinMax({
        min: 1,
        max: 50
      })
    } else if (evt === '1-100') {
      setMinMax({
        min: 1,
        max: 100
      })
    }
  }
  const handlePrefix = ev => {
    setPrefix(ev.target.value)
  }
  const handleSuffix = ev => {
    setSuffix(ev.target.value)
  }
  const handleData = evt => {
    setDataNum(evt.target.value)
  }
  const handleDataAdd = () => {
    setDataArray([...dataArray, dataNum]);
  }
  const handleAdd = () => {
    setXAxis([...xAxis, axisWord])
    setData([...dta, dataNum]);
    setModalTwo(false)
  }
  const handleTwoClose = () => {
    setModalTwo(false)
  }
  const handleAddModal = () => {
    setModalTwo(true)

  }
  const handleAddAxis = evt => {
    setAxisWord(evt.target.value)
  }
  const handleAddDt = evt => {
    setDataNum(evt.target.value)
  }
  return (
    <div className="App-container" >
      <div className="canvas-container">
        {model === "line" && <Line data={data}
          options={options} />}
        {model === 'bar' && <Bar data={{
          ...data, datasets: [{
            ...data.datasets[0],
            borderWidth: 0.5
          }]
        }}
          options={{
            ...options,
            legend: {
              labels: {
                boxWidth: 0
              }
            },
          }} />}
        {model === 'pie' && <Doughnut data={{
          ...data, datasets: [{
            ...data.datasets[0],
            backgroundColor: backgroundList,
            borderWidth: 1,
          }]
        }}
          options={options} />}
        {model === 'bubble' && <Bubble data={{
          ...data, datasets: [{
            ...data.datasets[0],
            backgroundColor: `${color}`, data: [
              { x: 0, y: 30, r: 20 }, { x: 1, y: 10, r: 20 }, { x: 2, y: 31, r: 20 }, { x: 3, y: 30, r: 20 }
              , { x: 4, y: 29, r: 20 }, { x: 5, y: 29, r: 20 }, { x: 6, y: 40, r: 20 }, { x: 7, y: 30, r: 20 },
              { x: 8, y: 30, r: 20 }, { x: 9, y: 25, r: 20 }, { x: 10, y: 80, r: 20 }, { x: 11, y: 22, r: 20 }
            ]
          }]
        }}
          options={options} />}
        <Button onClick={handleAddModal}
          style={{ height: '5vh' }} variant="outline-info">Add</Button>
      </div>
      <div className="btns-container">
        <div className="color-btn-container">
          <DropdownButton
            style={{ marginLeft: "1rem" }}
            key={'up'}
            id={`dropdown-button-drop-up`}
            drop={'up'}
            variant="info"
            title={`Change the Color`}
            onSelect={handleColorSelect}>
            <Dropdown.Item eventKey="1">Blue</Dropdown.Item>
            <Dropdown.Item eventKey="2">Green</Dropdown.Item>
            <Dropdown.Item eventKey="3">Yellow</Dropdown.Item>
            <Dropdown.Item eventKey="4">Grey</Dropdown.Item>
            <Dropdown.Item eventKey="5">Purple</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="6">Default</Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="chart-btn-container">
          <DropdownButton
            key={'up'}
            id={`dropdown-button-drop-up`}
            drop={'up'}
            variant="info"
            title={`Change the Chart`}
            onSelect={handleChartSelect}
          >
            <Dropdown.Item eventKey="1">Bar</Dropdown.Item>
            <Dropdown.Item eventKey="2">Pie</Dropdown.Item>
            <Dropdown.Item eventKey="3">Bubble</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="4">Line</Dropdown.Item>
          </DropdownButton>
        </div>
        <div className='btn-add-container'>
          <Button onClick={handleDataChange} variant="outline-info">Customize Data</Button>
        </div>
      </div>
      {modal && <Modal show={modal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Customize Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Header</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Type the title of your chart"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={handleHeader}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">x Axis</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Type a number or text"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={handleXAxis}
            />
            <InputGroup.Append>
              <Button onClick={handleXAxisAdd} variant="outline-primary">Add</Button>
            </InputGroup.Append>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">y Axis</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control as="select" onChange={ev => handleRangeSelect(ev.target.value)}>
              <option>1-10</option>
              <option>1-20</option>
              <option>1-40</option>
              <option>1-50</option>
              <option>1-100</option>
            </Form.Control>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">y Axis</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Prefix(eg: $)"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={handlePrefix}
            />
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">y Axis</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Suffix(eg: %)"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={handleSuffix}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Data</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Type a number"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={handleData}
            />
            <InputGroup.Append>
              <Button onClick={handleDataAdd} variant="outline-primary">Add</Button>
            </InputGroup.Append>
          </InputGroup>
          {
            axisArray.map((item, index) => {
              return (<ListGroup horizontal={"lg"} className="my-2" >
                <ListGroup.Item>{item}</ListGroup.Item>
                <ListGroup.Item>{dataArray[index]}</ListGroup.Item>
              </ListGroup>)
            })
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCustomize}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>}
      {modalTwo && <Modal show={modalTwo} onHide={handleTwoClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">x Axis</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Type text"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={handleAddAxis}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Data</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Type a number"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={handleAddDt}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleTwoClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>}
    </div >
  );
}
export default App;
