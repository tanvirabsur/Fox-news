import { MoreVertical } from 'lucide-react';
import React from 'react'

interface TableRowProps {
    article: {
        title: string;
        category: string;
        author: string;
        status: string;
        views: number;
        date: string;
    };
}



export default function TableRow({ article }: TableRowProps) {
    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4">
                <p className="text-sm font-semibold text-gray-900 line-clamp-1">{article.title}</p>
            </td>
            <td className="px-6 py-4">
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase">
                    {article.category}
                </span>
            </td>
            <td className="px-6 py-4 text-sm text-gray-600">{article.author}</td>
            <td className="px-6 py-4 text-sm">
                <span className={`
                          px-2 py-1 rounded-full text-[11px] font-semibold
                          ${article.status === 'Published' ? 'bg-green-100 text-green-700' :
                        article.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'}
                        `}>
                    {article.status}
                </span>
            </td>
            <td className="px-6 py-4 text-sm text-gray-600 font-mono">{article.views.toLocaleString()}</td>
            <td className="px-6 py-4 text-sm text-gray-600">{article.date}</td>
            <td className="px-6 py-4 text-right">
                <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical size={16} />
                </button>
            </td>
        </tr>
    )
}
