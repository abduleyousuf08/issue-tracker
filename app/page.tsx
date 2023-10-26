import Pagination from './components/Pagination';

//! Don't change
interface Props {
   searchParams: { page: string };
}

export default function Home({ searchParams }: Props) {
   return (
      <div>
         <Pagination
            itemCount={200}
            pageSize={10}
            currentPage={+searchParams.page}
         />
      </div>
   );
}
