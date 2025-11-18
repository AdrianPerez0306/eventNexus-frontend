import './radioInput.css'

interface RadioInputProps {
    label: string;
    value: string;
    register: any;
    helper:number
}

export const RadioInput = ({ label, value, register, helper} : RadioInputProps) => {
    return (
        <>
            <div className='container__radiobox' style={{ animationDelay: `${helper * 0.3}s` }}>
                <label className="radiobox-input">
                    <input className="event-type-radio"
                        type="radio"
                        value={value}
                        {...register}
                    />
                    <span className="keySpan">{label}</span>
                </label>
           </div>
            
        </>
    )

}