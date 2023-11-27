import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { PostMineAction } from '@project/common';
import { useTranslation } from 'react-i18next';

interface Props {
    disabled: boolean;
    postMineAction: PostMineAction;
    emptySubtitleTrack: boolean;
    recordingAudio: boolean;
    audioRecordingEnabled: boolean;
    onMineSubtitle: () => void;
}

const SidePanelBottomControls = ({
    disabled,
    postMineAction,
    emptySubtitleTrack,
    recordingAudio,
    audioRecordingEnabled,
    onMineSubtitle,
}: Props) => {
    const { t } = useTranslation();

    function buttonActionLabel() {
        if (emptySubtitleTrack) {
            if (audioRecordingEnabled) {
                return recordingAudio ? t('action.stopRecording') : t('action.startRecording');
            }

            return t('action.mine');
        }

        switch (postMineAction) {
            case PostMineAction.showAnkiDialog:
            case PostMineAction.none:
                return t('action.mine');
            case PostMineAction.updateLastCard:
                return t('action.updateLastCard');
        }
    }

    if (!emptySubtitleTrack) {
        // Mining buttons will be available on each subtitle row
        return null;
    }

    return (
        <Box p={2} style={{ position: 'absolute', bottom: 0, width: '100%' }}>
            <Button
                disabled={disabled || (recordingAudio && !emptySubtitleTrack)}
                variant="contained"
                color="secondary"
                startIcon={<NoteAddIcon />}
                onClick={onMineSubtitle}
                style={{ width: '100%' }}
            >
                {buttonActionLabel()}
            </Button>
        </Box>
    );
};

export default SidePanelBottomControls;
