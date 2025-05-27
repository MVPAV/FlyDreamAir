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
        <div className="bg-blue-50 px-4 sm:px-6 py-5 rounded-md shadow-sm space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-sm sm:text-base font-semibold text-blue-900">
                <h3 className="text-base sm:text-lg font-bold text-blue-800">{title}</h3>
                <div className="text-right sm:text-left">${total}</div>
            </div>

            {/* Items */}
            <div className="space-y-6">
                {items.map((item, idx) => (
                    <div key={idx} className="border-t border-gray-200 pt-4 space-y-2">
                        <h4 className="font-semibold text-black">{item.label}</h4>

                        <ul className="space-y-2 text-sm text-gray-800">
                            {item.details.map((d, i) => (
                                <li
                                    key={i}
                                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1"
                                >
                  <span className="break-words">
                    <span className="font-medium text-gray-600">{d.route}:</span>{" "}
                      {d.value}
                  </span>
                                    {d.price !== undefined && (
                                        <span className="sm:text-right font-semibold text-blue-900">
                      ${d.price}
                    </span>
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
