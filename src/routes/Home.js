import React, { useEffect, useState } from "react";
import Nweet from "components/Nweet";
import { dbService, } from "fBase";
import NweetFactory from "components/NweetFactory"

function Home({ userObj }) {
    const [nweets, setNweets] = useState([]);
    
    useEffect(() => {
        const unsubscribe = dbService.collection("nweets").onSnapshot(snapshot => {
            const nweetArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArray);
            console.table(nweetArray);
        });
        return unsubscribe;
    }, []);

    return (
        <div>
            <NweetFactory userObj={userObj}/>
            <div>
                {nweets.map(nweet => 
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={ nweet.creatorId === userObj.uid}/>
                )}
            </div>
        </div>
    );
}

export default Home;