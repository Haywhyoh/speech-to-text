handleInput = async (inputValue, isPrompt = null) => {
		if (!inputValue) return;
	
		let conversationId = this.state.conversationId;
		let isNew = false;
	
		// First, ensure there's a conversationId and WebSocket connection
		if (!conversationId) {
			conversationId = await this.createConversation();
			isNew = true;
			if (!conversationId) {
				this.setState({
					status: 'error',
					error: 'Failed to create a new conversation. Please try reloading the page.',
				});
				return;
			}
		}
	
		if (!this.state.ws || this.state.ws.readyState !== WebSocket.OPEN) {
			this.setState({
				status: 'error',
				error: 'Connection is not active. Please reload the page to reconnect.',
			});
			return;
		}
	
		// All checks passed, proceed with setting loading state and handling the input
		this.setState(prevState => ({
			messages: [...prevState.messages, { text: inputValue, sender: "You" }],
			inputValue: "",
			messageCount: prevState.messageCount + 1,
			status: "loading",
			error: null,
			botTyping: true,
		}));
	
		const requestData = {
			function_type: "generateResponse",
			local_timezone: this.state.LocalTimezone,
			owner: this.state.user.username,
			conversation_id: conversationId,
			message: inputValue,
			messageCount: this.state.messageCount,
			group: this.state.group,
			is_plus_group: this.state.isPlusGroup,
			is_new: isNew,
			is_prompt: isPrompt
		};
	
		this.state.ws.send(JSON.stringify(requestData));
		await this.createMessage('USER', inputValue, conversationId);
	};
	

    