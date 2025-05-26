import { SummaryItem } from "src/app/(main)/ticket-summary/types";

type SummarySectionProps = {
    title: string;
    items: SummaryItem[];
};

export default function SummarySection({ title, items }: SummarySectionProps) {
    const total = items.reduce(
        (acc, item) => acc + item.details.reduce((s, d) => s + (d.price || 0), 0),
        0
    );

    return (
        <div className="bg-blue-50 px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center font-semibold mb-3 text-sm sm:text-base">
                <span>{title}</span>
                <span className="text-blue-900">${total}</span>
            </div>

            <div className="space-y-4 text-sm">
                {items.map((item, idx) => (
                    <div key={idx}>
                        <ul className="list-none space-y-1 text-black">
                            {title !== "Baggage" && (
                                <li className="font-medium text-black mb-1">{item.label}</li>
                            )}
                            {item.details.map((d, i) => (
                                <li
                                    key={i}
                                    className="flex flex-col sm:flex-row justify-between sm:items-center text-sm"
                                >
                                    <span className="break-words">
                                        <strong>{d.route}:</strong> {d.value}
                                    </span>
                                    {d.price !== undefined && (
                                        <span className="text-right sm:text-left sm:ml-4">${d.price}</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
