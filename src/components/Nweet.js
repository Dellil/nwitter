import { dbService, storageService } from "fBase";
import React, { useState } from "react";

function Nweet({ nweetObj, isOwner }) {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async (e) => {
        const ok = window.confirm("Are you sure want to delete this nweet?")
        if(ok) {
            await dbService.doc(`/nweets/${nweetObj.id}`).delete();
            await storageService.refFromURL(nweetObj.attachmentUrl).delete();
        }
    };

    const toggleEditing = () => setEditing(prev => !prev);
    const onSubmit = async (e) => {
        e.preventDefault();
        await dbService.doc(`/nweets/${nweetObj.id}`).update({
            text: newNweet,
        });
        setEditing(false);
    }
    const onChange = (e) => {
        const { target: { value } } = e;
        setNewNweet(value);
    }

    return (
        <div key={nweetObj.id}>
            {
                editing ? 
                <>
                    <form onSubmit={onSubmit}>
                        <input 
                        type="text" 
                        placeholder="Edit your nweet" 
                        required 
                        value={newNweet} 
                        onChange={onChange}
                        />
                        <input type="submit" value="Update Nweet"/>
                    </form>
                    <button onClick={toggleEditing}>Cancle</button>
                </>
                :
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" height="50px" />}
                </>
            }
            { isOwner &&
                <>
                    <button onClick={onDeleteClick}>Delete Nweet</button>
                    <button onClick={toggleEditing}>Edit Nweet</button>
                </>
            }
        </div>
    );
}

export default Nweet;