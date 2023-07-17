import { React, useState, useEffect } from 'react'
import CopyToClipboard from "react-copy-to-clipboard";
import axios from "axios";

const Home = () => {

    const [shortName, setShortName] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [copyLink,setCopyLink] = useState('')
    const [sort, setSort] = useState([]);
 
// Is used for managing the value of input.
    const handleInputChange = (e) => {
        setShortName(e.target.value)

    }

  // for Get the result of shotendlink
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
                setCopyLink(stortenLink)
                setSort(linkstrore);
                setShortName("")
                //By Using the localStorage we save the data for displaying all the link after the url.
                localStorage.setItem("storendLink", JSON.stringify(linkstrore))
                setErrorMessage('');

            } catch {

                setErrorMessage('Please enter the valid value.');
            }

        }
    }

// Display a success message to the user after copying to clipboard
    const handleCopyToClipboard = () => {
        alert("URL copied to clipboard!");
      };

    //UseEffect is used When the project is refresh all the link are display.  
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
                      {/* Input field for the user to enter the value for conveting into sortend */}
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
                    {copyLink && ( 
                        <>
                        <div className='ml-44 mt-2'>
                        <a className="text-blue-900 font-semibold" rel="noopener noreferrer" target='_blank' href={`https://${copyLink}`} >{copyLink}</a>
                        </div>
                <CopyToClipboard
                  text={copyLink}
                  onCopy={handleCopyToClipboard} 
                >
                  <button
                  className='bg-green-500 text-white mt-2 ml-44 flex justify-center items-center p-2 rounded-md'
                    
                    size="small"
                    sx={{ ml: 2 }}
                  >
                    Copy URL to Clipboard
                  </button>
                </CopyToClipboard>
                </>
              
            )}
                    <div className=" mt-5 flex flex-col items-center">
                        {sort.map((link, index) => (
                            <div key={index} >
                                <a className="text-blue-900 font-semibold" rel="noopener noreferrer" target='_blank' href={`https://${link}`} >{link}</a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home