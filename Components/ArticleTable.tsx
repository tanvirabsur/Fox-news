import React from 'react'
import TableRow from './TableRow';



// Types for our News Data
interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  status: 'Published' | 'Draft' | 'Pending';
  views: number;
  date: string;
}

  const recentArticles: Article[] = [
    { id: '1', title: 'Budget 2024: Ki thakche amader jonno?', category: 'Economy', author: 'Arif Ahmed', status: 'Published', views: 12500, date: '2024-05-10' },
    { id: '2', title: 'T20 World Cup er prostuti', category: 'Sports', author: 'Sakib Khan', status: 'Pending', views: 0, date: '2024-05-12' },
    { id: '3', title: 'AI er bhabishyat o Bangladesh', category: 'Tech', author: 'Nadia Islam', status: 'Published', views: 8900, date: '2024-05-11' },
    { id: '4', title: 'Dhakar rasta-ghater obostha', category: 'Local', author: 'Rahim Uddin', status: 'Draft', views: 0, date: '2024-05-12' },
  ];


export default function ArticleTable() {

  return (
 <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Recent Articles</h3>
              <button className="text-blue-600 text-sm font-semibold hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Author</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Views</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentArticles.map(article => <TableRow key={article.id} article={article} />)}

                </tbody>
              </table>
            </div>
          </div>
  )
}
