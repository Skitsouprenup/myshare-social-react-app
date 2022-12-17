import { sanityclient } from '../../sanityclient';

export const createPin = (
    navigate, setLoading, setSubmittingForm, image,
    title, about, destination, userId, category) => {
    
    sanityclient.
    assets.
    upload('image', image, { contentType: image.type, filename: image.name }).
    then((imgDoc) => {
        
        const doc = {
            _type: 'pin',
            title,
            about,
            destination,
            category,
            image : {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: imgDoc._id
                }
            },
            userId,
            postedBy: {
                _type: 'postedBy',
                _ref: userId
            }
        }

        sanityclient.create(doc).
        then(() => {
            alert('Pin Created!');
            navigate('/home/pins');
            window.location.reload();
        }).
        catch((e) => {
            setLoading(false);
            setSubmittingForm(false);
            console.error(e);
            alert('Error Creating Document\n' + e);
        });
    }).catch((e) => {
        setLoading(false);
        setSubmittingForm(false);
        console.error(e);
        alert('Error Uploading Image\n' + e);
    });

}