import Nweet from "components/Nweet";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fBase";
import React, { useEffect, useState } from "react";

function Home({ userObj }) {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");

    // const getNweets = async () => {
    //     const dbNweets = (await dbService.collection("nweets").get())
    //     .docs.map(
    //         (doc) => {
    //             const nweetObject = {
    //                 id: doc.id,
    //                 ...doc.data()
    //             };
    //             return nweetObject;
    //         }
    //     );

    //     setNweets(dbNweets);
    //     console.table(dbNweets);
    // }
    
    useEffect(() => {
        // getNweets();
        dbService.collection("nweets").onSnapshot(snapshot => {
            const nweetArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArray);
            console.table(nweetArray);
        })
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        let attachmentUrl = "";
        if(attachment !== "") {
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
        const response = await attachmentRef.putString(attachment, "data_url");
        attachmentUrl = await response.ref.getDownloadURL();
        
        }
        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        }
        await dbService.collection("/nweets/").add(nweetObj);
        setNweet("");
        setAttachment("");
    }

    const onChange = (e) => {
        const { target: { value }} = e;
        setNweet(value);
    }

    const onFileChange = (e) => {
        const { target: { files } } = e;
        const file = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { currentTarget: { result } } = finishedEvent;
            setAttachment(result)
        }
        reader.readAsDataURL(file);
    }

    const onClearAttachment = () => {
        setAttachment(null);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                type="text" 
                value={nweet} 
                onChange={onChange} 
                placeholder="What's on your mind?" 
                maxLength={120}
                />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Nweet" />
                { 
                attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" alt="just preview" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                    )
                }
            </form>
            <div>
                {nweets.map(nweet => 
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={ nweet.creatorId === userObj.uid}/>
                )}
            </div>
        </div>
    );
}

export default Home;