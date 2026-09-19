import React from 'react';
import { Link } from 'react-router-dom';

interface ShopCardProps {
  icon: React.ReactNode;
  uri: string;
  title: string;
  desc: string;
}

const ShopCard = ({ icon, uri, title, desc }: ShopCardProps) => {
  return (
    <div className="flex-row bg-white rounded-lg shadow p-2 flex items-center sm:space-x-4 space-x-4 hover:bg-gray-100 gap-2">
      {icon}
      <Link to={uri} className="sm:my-10 sm:mx-10 my-2 mx-2">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="text-gray-600">{desc}</p>
      </Link>
    </div>
  );
};

export default ShopCard;
