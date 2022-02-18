import React from 'react'
import { Channel, useChatContext, MessageTeam } from 'stream-chat-react'

import { ChannelInner, CreateChannel, EditChannel } from './'

const ChannelContainer = ({ isCreating, isEditing, setIsCreating, setIsEditing, createType }) => {
    const { channel } = useChatContext();

    if(isCreating){
        return(
            <div className="channel__container">
                <CreateChannel createType={createType} setIsCreating={setIsCreating} />
            </div>
        );
    }

    if(isEditing){
        return(
            <div className="channel__continer">
                <EditChannel setIsEditing={setIsEditing} />
            </div>
        )
    }

    const emptyState = () => (
        <div className="channel-empty__container">
            <p className="channel-empty__first">This is the beginning of your Chat history.</p>
            <p className="Send messages, attachments, links, emojis and more..."></p>
        </div>
    )

    return (
        <div className='channel__container'>
            <Channel
                EmptyStateIndicator={emptyState}
                Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
            >
                <ChannelInner setIsEditing={setIsEditing} />
            </Channel>
        </div>
    )
}

export default ChannelContainer
