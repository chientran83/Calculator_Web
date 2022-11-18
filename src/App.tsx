import classNames from 'classnames/bind';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import calculatorSlice from './redux/slices/calculatorSLice';

import styles from './App.module.css';
const cx = classNames.bind(styles)

const Btn = ({ value, children, onClick }: { value: number | string, children: any, onClick: any }) => {
  const classed = cx(
    "calculator__btn",
    {
      "calculator__btn--equales": value === "="
    }
  )
  const propList = {
    onClick
  }
  return (
    <button className={classed} value={value} {...propList}>{children}</button>
  )
}

function App() {
  const dispatch = useDispatch();

  const calculatorHistory = useSelector((state: any) => state.calculator.history)

  const [calc, setCalc] = React.useState({
    number: 0,
    sign: "",
    result: 0
  })
  const btns = [
    "C", "+-", "%", "/", 7, 8, 9, "x", 4, 5, 6, "-", 1, 2, 3, "+", 0, ".", "="
  ]
  const handleClickReset = (btnValue: number) => {
    setCalc({
      result: 0,
      number: 0,
      sign: ""

    })
  }

  const handleClickEquals = () => {
    if (calc.result && calc.sign) {
      const math = ({ a, b, sign }: { a: any, b: any, sign: string }) => {
        let res = 0;
        if (sign === "+") {
          res = Number(a) + Number(b);
        } else if (sign === "-") {
          res = Number(a) - Number(b);
        } else if (sign === "x") {
          res = Number(a) * Number(b);
        } else {
          res = Number(a) / Number(b);
        }
        return res;
      }
      const res = math({ a: calc.result, b: calc.number, sign: calc.sign });
      dispatch(calculatorSlice.actions.addHistory(`${calc.result} ${calc.sign} ${calc.number} = ${res}`))
      setCalc((prev: any) => {
        return {
          sign: "",
          number: res,
          result: res
        };
      })
    }
  }
  const handleClickSign = (btnValue: any) => {
    setCalc((prev: any) => {
      return {
        number: 0,
        result: prev.number,
        sign: btnValue
      }
    })
  }
  const handleClickComma = (btnValue: number) => {
    setCalc((prev: any) => {
      return {
        ...prev,
        number: prev.number.toString().includes(".")
          ? prev.number
          : prev.number + btnValue
      }
    })

  }
  const handleClickInvert = () => {
    setCalc((prev) => {
      return {
        ...prev,
        number: prev.number * -1
      }
    })
  }
  const handleClickPercent = () => {
    setCalc((prev) => {
      return {
        ...prev,
        number: Number(prev.number) * (1 / 100)
      }
    })
  }
  const handleClickNumber = (btnValue: number) => {
    setCalc((prev: any) => {
      return {
        ...prev,
        number:
          prev.number === 0 && Number(btnValue) === 0
            ? 0
            : prev.number === 0 
            ? btnValue
            : prev.number + btnValue
      };
    })
  }
  const handleClickBtn = (e: any) => {
    const btnValue = e.target.getAttribute('value')
    if (btnValue === "C") {
      handleClickReset(btnValue);
    } else if (btnValue === "=") {
      handleClickEquals()
    } else if (btnValue === "x" || btnValue === "-" || btnValue === "+" || btnValue === "/") {
      handleClickSign(btnValue)
    } else if (btnValue === "+-") {
      handleClickInvert()
    } else if (btnValue === '.') {
      handleClickComma(btnValue)
    } else if (btnValue === '%') {
      handleClickPercent()
    } else {
      handleClickNumber(btnValue)
    }
  }

  // const handleCalc = async () => {
  //   try{
  //     const res = await eval("(1+1)+ 6");
  //     setResult(res);
  //   }catch (e){
  //     setResult("error");
  //   }
  // }

  // const [result,setResult] = React.useState('');
  // React.useEffect(() => {
  //   handleCalc()

  // },[])
  // console.log(result);

  return (
    <div className={cx("App")}>
      <div className={cx("calculator")}>
        <h1 className={cx("calculator__value")}>
          {calc.number ? calc.number : calc.result}
        </h1>
        <div className={cx("calculator__btns")}>
          {
            btns.map((index, key) => {
              return <Btn value={index} key={key} onClick={(e: any) => { handleClickBtn(e) }}>{index}</Btn>
            })
          }
        </div>
        {
          !!calculatorHistory.length && <div className={cx("calculator__history")}>
            history :
            <div className={cx("historys")}>
              {calculatorHistory.map((index: any, key: any) => {
                return <h3 className={cx("history")} key={key}>
                  {index}
                </h3>
              })}
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
