import { sanityclient } from "../../sanityclient";

export const uploadUserBanner = (image, userId, setUploadingBanner) => {
    
    sanityclient.
    assets.
    upload('image', image, { contentType: image.type, filename: image.name }).
    then((imgDoc) => {

        //previous image ref
        const query = `*[_type == 'user' && _id == '${userId}']
                        { banner { asset -> {_id} } }`;

        sanityclient.
        fetch(query).
        then((data) => {

            const img = {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: imgDoc._id
                }
            };

            sanityclient.
            patch(userId).
            set({banner: img}).
            commit().
            then(() => {

                const deleteRefImage = `*[_type in ["sanity.imageAsset", "sanity.fileAsset"] 
                                           && _id == "${data?.banner?.asset?._id}"]`;
                sanityclient.delete({query: deleteRefImage});
                alert('Banner has been successfully changed!');
                setUploadingBanner(false);
            });

        });

    });
};

export const deleteUserBanner = (userId, setUploadingBanner) => {
    const query = `*[_type == 'user' && _id == '${userId}'][0]{ banner { asset -> { _id } } }`;

    sanityclient.
    fetch(query).
    then((data) => {
        const imgRefId = data?.banner?.asset?._id;

        if(imgRefId) {
            sanityclient.patch(userId).set({banner: null}).commit().
            then(() => {
                const deleteRefImage = `*[_type in ["sanity.imageAsset", "sanity.fileAsset"] 
                                        && _id == "${imgRefId}"]`;
                sanityclient.delete({query: deleteRefImage}).
                then(() => {
                    alert('Banner successfully removed!');
                    setUploadingBanner(false);
                }).catch((e) => {
                    console.error(`Banner reference is removed from user. Although, The image
                                   referenced to it is not removed.`);
                    console.error(e);
                    setUploadingBanner(false);
                });
            }).
            catch((e) => {
                console.error('Couldn\'t unset banner from user.');
                console.error(e);
                alert('Couldn\'t unset banner from user.');
                setUploadingBanner(false);
            });
        } else {
            console.error('user banner is either undefined, null or not existing.');
            setUploadingBanner(false);
        }
    }).
    catch(
        (e) => {
            console.error(`There's a problem retrieving image id.`);
            console.error(e);
            alert(`There's a problem retrieving image id.`);
            setUploadingBanner(false);
        }
    );
};