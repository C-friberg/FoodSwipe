import "./Button.css";

type ButtonProps = {
    children: React.ReactNode;

    onClick?: () => void; 
    type?: "button" | "submit";
    variant?: "primary" | "danger" | "secondary"; 
    loading?: boolean;
    disabled?: boolean; 
};

export default function Button({
    children,
    onClick,
    type = "button",
    variant = "primary",
    loading = false,
    disabled = false
}: ButtonProps) {
    return (
        <button type={type} onClick={onClick} disabled={disabled || loading} className={`custom-button ${variant}`}> 
            {loading ? "Laddar..." : children}
        </button> 
    )
}