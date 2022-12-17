import { sanityclient } from '../../sanityclient';

export const deletePin = (pinId, setReloadFeed, setDeletingPin) => {
    const query = `*[_type == 'pin' && _id == '${pinId}'][0]{ image { asset -> { _id } } }`;

    sanityclient.fetch(query).then(
        (data) => {
            const imgRefId = data?.image?.asset?._id;
            
            if(imgRefId) {
                sanityclient.delete(pinId).then(
                    () => {
                        const deleteRefImage = `*[_type in ["sanity.imageAsset", "sanity.fileAsset"] 
                                               && _id == "${imgRefId}"]`;
                        sanityclient.delete({query: deleteRefImage}).
                        then( () => {
                            alert('Pin Successfully Deleted!');
                            setReloadFeed(true);
                        }).catch(
                            (e) => {
                                console.error(`Pin is deleted. Although, the image referenced
                                               to it couldn't be deleted.`);
                                console.error(e);
                                setReloadFeed(true);
                            }
                        );
                    }
                ).catch(
                    (e) => {
                        console.error(`There's a problem deleting this pin.`);
                        console.error(e);
                        alert(`There's a problem deleting this pin.`);
                        setDeletingPin(false);
                    }
                );
            }
            else {
                console.error('Pin image is either undefined, null or not existing.');
                setDeletingPin(false);
            }
        }
    ).catch(
        (e) => {
            console.error(`There's a problem retrieving image id.`);
            console.error(e);
            alert(`There's a problem retrieving image id.`);
            setDeletingPin(false);
        }
    );
};

export const deletePinInPinInfo = (pinId, navigate, setLoading) => {

    const query = `*[_type == 'pin' && _id == '${pinId}'][0]{ image { asset -> { _id } } }`;

    sanityclient.fetch(query).then(
        (data) => {
            const imgRefId = data.image.asset._id;
            if(imgRefId) {
                sanityclient.delete(pinId).then(
                    () => {
                        const deleteRefImage = `*[_type in ["sanity.imageAsset", "sanity.fileAsset"] 
                                               && _id == "${imgRefId}"]`;
                        sanityclient.delete({query: deleteRefImage}).
                        then( () => {
                            alert('Pin Successfully Deleted!');
                            navigate('/home/pins', {replace: true});
                        }).catch(
                            (e) => {
                                console.error(`Pin is deleted. Although, the image referenced
                                               to it couldn't be deleted.`);
                                               console.error(e);
                                setLoading(false);
                            }
                        );
                    }
                ).catch(
                    (e) => {
                        console.error(`There's a problem deleting this pin.`);
                        console.error(e);
                        alert(`There's a problem deleting this pin.`);
                        setLoading(false);
                    }
                );
            }
            else {
                console.error('Pin image is either undefined, null or not existing.');
                setDeletingPin(false);
            }
        }
    ).catch(
        (e) => {
            console.error(`There's a problem retrieving image id.`);
            console.error(e);
            alert(`There's a problem retrieving image id.`);
            setLoading(false);
        }
    );

};