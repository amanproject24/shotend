import { React, useState, useEffect } from 'react'
import axios from "axios";

const Home = () => {

    const [shortName, setShortName] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [sort, setSort] = useState([]);

   
// handleInputChange 
    const handleInputChange = (e) => {
        setShortName(e.target.value)

    }

    const getShortEnd = async () => {

        if (shortName.trim() === '') {
            setErrorMessage('Please enter a value.');
        } else {

            try {
                const fetchAPI = await axios(
                    `https://api.shrtco.de/v2/shorten?url=${shortName}`
                );
                const stortenLink = fetchAPI.data.result.short_link
                const linkstrore = [...sort, stortenLink]
                setSort(linkstrore);
                localStorage.setItem("storendLink", JSON.stringify(linkstrore))

                setErrorMessage('');

            } catch {

                setErrorMessage('Please enter the valid value.');
            }

        }

    }
    useEffect(() => {
        const savedFromStorage = localStorage.getItem("storendLink");
        console.log(savedFromStorage)

        if (savedFromStorage) {
            setSort(JSON.parse(savedFromStorage));
        }
    }, [])

    return (
        <div className='bg-blue-800 h-screen container'>
            <h1 className='text-center font-semibold text-white  pt-10 tracking-wider	text-4xl'>
                SHTCODE
            </h1>

            <div className='flex justify-center items-center mt-48 '>

                <div className="bg-white  shadow-md rounded-md  w-3/5  p-4">
                    <h2 className="text-xl text-center font-bold mb-2">Link Shortener</h2>
                    <div className='mt-10 flex justify-center'>
                        <input
                            className="outline-none w-96  border-2 border-blue-500 rounded-md backdrop-blur-xl bg-white/20 shadow-md px-3 py-2 "
                            type="text"
                            placeholder="Enter link"

                            value={shortName}
                            onChange={handleInputChange}

                        />
                        <button
                            className=" bg-blue-500 text-white px-8 py-3 ml-4 rounded-md"

                            onClick={() => {
                                getShortEnd()
                            }}
                        >
                            Submit URL
                        </button>

                    </div>
                    {errorMessage && <p className="pl-44 pt-4 text-red-600 font-semibold">{errorMessage}</p>}
                    <div className=" mt-5 flex flex-col items-center">

                        {/* {
                            sort.map((items) => {
                                <a href="/">{items}</a>
                            })
                        } */}

                        {sort.map((link, index) => (
                            <div key={index} >
                                <a className="text-blue-900 font-semibold" href={link}>{link}</a>
                            </div>
                        ))}


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home