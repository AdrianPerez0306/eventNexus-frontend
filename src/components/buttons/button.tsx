import './button.css';

interface ButtonProps {
    label: string;
    method : () => void;
    onSubmitMethod?: () => void;
    buttonType? :"button" | "submit" | "reset" | undefined;
    isCancel: boolean;
}


export const ButtonApp = ({label,method,onSubmitMethod,buttonType = 'button', isCancel} : ButtonProps) => {
    return (
        <>
            <button 
            type={buttonType}
            className={`buttonApp ${isCancel ? 'button-cancel' : 'button-acept'}`} onClick={method} onSubmit={onSubmitMethod}>{label}</button>
        </>
    );
}
