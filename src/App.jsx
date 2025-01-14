import { useState } from 'react'
import {InputBox} from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    if (!currencyInfo[to]) {
      alert("Failed to fetch currency data. Please try again later.");
      return;
    }
    setConvertedAmount(amount*currencyInfo[to])
  }

  const handleAmountChange = (value) => {
    const numericValue = parseFloat(value);
    if (numericValue >= 0 || value === '') {
      setAmount(value === '' ? 0 : numericValue);
    } else {
      console.log('Amount cannot be negative.');
    }
  }

  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-center "
        style={{
            backgroundImage: `url('https://cdn.pixabay.com/photo/2024/06/18/03/40/finance-8836903_640.jpg')`,
        }}
    >
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert()
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount = {amount}
                            currencyOptions = {options}
                            onCurrencyChange = {
                              (currency) => setAmount(amount)
                            }
                            selectCurrency = {from}
                            onAmountChange={handleAmountChange}
                            
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}
                            
                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="To"
                            amount={convertedAmount}
                            currencyOptions = {options}
                            onCurrencyChange = {
                              (currency) => setTo(currency)
                            }
                            selectCurrency = {to}
                            amountDisable
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>
  );
}

export default App
