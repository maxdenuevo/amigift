const ParticipantView = () => {
    const { participantId } = useParams();
    const { 
      participant, 
      loading, 
      error, 
      fetchParticipant,
      updateParticipantData 
    } = useParticipant(participantId);
  
    useEffect(() => {
      if (participantId) {
        fetchParticipant(participantId);
      }
    }, [participantId, fetchParticipant]);
  
    const handleUpdateWishlist = async (wishlist) => {
      try {
        await updateParticipantData(participantId, { wishlist });
        // Handle success
      } catch (err) {
        // Error is handled by the hook
        alert(error);
      }
    };
  
    if (loading) {
      return <div className="text-center">{t('common.loading')}</div>;
    }
  
    if (error) {
      return <div className="text-center text-red-500">{error}</div>;
    }
  
    // Rest of your component JSX...
  };