type PrimaryButtonProps = {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    className?: string;
};

const PrimaryButton = ({
                           children,
                           type = "button",
                           onClick,
                           className = "",
                       }: PrimaryButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`text-lg w-full bg-[#000057] text-white py-3 rounded-md font-semibold hover:bg-blue-900 transition ${className}`}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;
