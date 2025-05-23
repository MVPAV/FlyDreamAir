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
            <div className="flex justify-between font-semibold mb-2 text-base">
                <span>{title}</span>
                <span>${total}</span>
            </div>
            <div className="space-y-2 text-sm">
                {items.map((item, idx) => (
                    <div key={idx}>
                        <ul className="list-none space-y-1 text-black pl-4">
                            {title !== "Baggage" && (
                                <li className="font-medium text-black">{item.label}</li>
                            )}
                            {item.details.map((d, i) => (
                                <li key={i} className="flex justify-between items-center">
                                    <span>
                                    <strong>{d.route}:</strong> {d.value}
                                    </span>
                                    {d.price !== undefined && <span>${d.price}</span>}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
