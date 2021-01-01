import React, { useState } from "react";
import { dbService, storageService } from "fBase";
import { v4 as uuidv4 } from "uuid";

function NweetFactory({ userObj }) {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");

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
    );
}

export default NweetFactory;