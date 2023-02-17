// make a react functional component with typescript, component is called home

import React, { useEffect,useState } from 'react'
import { useQuery } from 'react-query'
import {useDispatch, useSelector} from 'react-redux'
import { getHeadlines, searchHeadlines } from '../api/news'
import Card from '../components/newsCard'
import { Headline, Response } from '../types';
import { appendHeadlines, appendSearchResult, clearSearchResult } from '../store/news'
import { useAppDispatch, useAppSelector } from '../utils/hooks'

export default function Home(){

    const headlines = useAppSelector( (state) => state.news.headlines)
    const searchResult = useAppSelector( (state) => state.news.searchResult)
    const dispatch = useAppDispatch()
    const [page, setPage] = React.useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [isSearching, setIsSearching] = useState(false);
    const [query, setQuery] = useState("");
    const [sortBy, setSortBy] = useState("popularity");
    const [timerId, setTimerId] = useState<any>(null);

    const {data,error, refetch: fetchData,isLoading } = useQuery<Response<Headline[]>>(['headlines', page], async () => await getHeadlines({country:'us',page}),{
        enabled:false,
        retry: false,
    })

    const {data: searchedData, refetch:search} = useQuery<Response<Headline[]>>(['search', page], async () => await searchHeadlines({q:query,page, sortBy, pageSize:20}),{
        enabled:false,
        retry: false
    })


  
    const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    };
  
    const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSortBy(event.target.value);
    };

    useEffect(() => {
        if(query.trim() !== '')
            handleSearch(600)

    }, [query,page]);
 

    useEffect(() => {
        console.log('sort by change')
        setPage(1)
        dispatch(clearSearchResult())
        handleSearch(0)
    }, [sortBy]);

    useEffect(() => {
        if(searchedData?.articles ){
            dispatch(appendSearchResult(searchedData?.articles as Headline[]))
            setTotalResults(searchedData?.totalResults as number)
        }
    },[searchedData])

    useEffect(() => {

        if(data?.articles && !isLoading){
            console.log(data?.articles)
            dispatch(appendHeadlines(data?.articles as Headline[]))
            setTotalResults(data?.totalResults as number)
        }
    }, [data,error])



    useEffect(() => {
        if(query.trim() == '' && !isLoading )
            fetchData()
    },[page])

    function cancelSearch(){
        console.log('cancel search')
        setQuery('')
        dispatch(clearSearchResult())
        setIsSearching(false)
        setPage(1)
    }


    function handleSearch(timeout:number){
        const fetchArticles = async () => {
            await search()
        };

        if(timerId)
            clearTimeout(timerId)

        const newTimerId =  setTimeout(async () => {
            if(query.trim() !== ''){
                setIsSearching(true)
                await fetchArticles()
            }
        }, timeout)

        setTimerId(newTimerId)
    }

    return (
        <div className=''>
            <div className="max-w-5xl mx-auto">
                <section className="py-12z flex items-center justify-center bg-white">
                    <div className="mx-auto w-full">
                        <div className="text-center">
                            <h1 className="mt-3 text-[2.5rem] font-bold leading-[4rem] tracking-tight text-black">
                                What's trending
                            </h1>
                        </div>
                    </div>
                </section>
                <section className='flex justify-center pt-8'>
                    <div className="flex flex-col sm:flex-row sm:items-center mb-6 w-full  ">
                        <div className="w-full sm:w-1/2 flex items-center">
                            <label htmlFor="query" className="sr-only">
                            Search Query
                            </label>
                            <input
                            type="text"
                            id="query"
                            name="query"
                            placeholder="Search Query"
                            value={query}
                            onChange={handleQueryChange}
                            className="w-full px-4 py-2 text-gray-900 bg-gray-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            />
                            {
                                query && (
                                <button onClick={cancelSearch} className='pl-4'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z"/></svg>
                                </button>)
                            }
                        </div>
                        {
                            query && (
                                <div className="w-full sm:w-1/2 sm:text-right mt-4 sm:mt-0" >
                            <label htmlFor="sortBy" className="mr-2 font-medium">
                            Sort By:
                            </label>
                            <select
                            id="sortBy"
                            name="sortBy"
                            value={sortBy}
                            onChange={handleSortByChange}
                            className="px-4 py-2 text-gray-900 bg-gray-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            >
                            <option value="popularity">Popularity</option>
                            <option value="relevancy">Relevance</option>
                            <option value="publishedAt">Published Date</option>
                            </select>
                        </div>
                            )
                        }
                    </div>
                </section>
                <section className='mx-auto '>
                { isSearching && <div className="py-5 "> {totalResults} Results.... </div>    }
                </section>
                <section className='flex flex-col items-center mb-10'>
                    {
                    (isSearching && searchResult) ? 
                        searchResult.map((headline) => <Card headline={headline}  key={headline.url}/>) : 
                        headlines && headlines.map((headline) => <Card headline={headline}  key={headline.url}/>) 
                    }

                    { (isSearching ? searchResult.length < totalResults : headlines && headlines.length < totalResults) ?
                        (<button onClick={() => setPage(page+1)} className="px-4 py-2 cursor-pointer my-6 max-w-[10rem] font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                        Load More...
                        </button>) : (<span>End of Results</span>)
                    }

                </section>
            </div>

        </div>
    )

}