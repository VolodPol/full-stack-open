const Notification = ({ notification }) => {
    if (notification === null) {
        return null
    }

    let className = 'message';
    notification.isSuccess ? className += ' added' : className += ' error';

    console.log(className);
    return (
        <div className={className}>
            {notification.message}
        </div>
    )
}

export default Notification;