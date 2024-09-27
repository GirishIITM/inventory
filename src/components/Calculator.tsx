import { useState } from 'react';
import '../styles/calculator.css';
import CalculateIcon from '@mui/icons-material/Calculate';

const Calculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState<string | null>(null);
    const [show, setShow] = useState(false);

    const handleClick = (value: string) => {
        setInput((prev) => prev + value);
        calculateResult(input + value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setInput(value);
        calculateResult(value);
    };

    const clearInput = () => {
        setInput('');
        setResult(null);
    };

    const calculateResult = (expression: string) => {
        try {
            const res = eval(expression);
            setResult(res);
        } catch (error) {
            // toast.error('Invalid expression');
            setResult(null);
        }
    };

    return (
        <div className='calculator'>
            <div className='calculator-icon' onClick={() => setShow(c => !c)}>
                <CalculateIcon style={{fontSize: 35}}/>
            </div>
            {show && (<div className="calculator-popup">
                {true && (<div>
                    <div className="display">
                        <textarea
                            className={`input ${result !== null ? 'shrunk' : ''}`}
                            value={input}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Enter expression"
                        />
                        <div className="result">{result !== null ? result : ''}</div>
                    </div>
                    <div className="buttons">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                            <button key={num} onClick={() => handleClick(num.toString())}>
                                {num}
                            </button>
                        ))}
                        <button onClick={() => handleClick('+')}>+</button>
                        <button onClick={() => handleClick('-')}>-</button>
                        <button onClick={() => handleClick('*')}>*</button>
                        <button onClick={() => handleClick('/')}>/</button>
                        <button onClick={() => handleClick('.')}>.</button>
                        <button onClick={clearInput}>C</button>
                    </div>
                </div>)}
            </div>)}
        </div>

    );
};

export default Calculator;
