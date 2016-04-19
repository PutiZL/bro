# Generated by binpac_quickstart

# Analyzer for Network Time Protocol
#  - ntp-protocol.pac: describes the NTP protocol messages
#  - ntp-analyzer.pac: describes the NTP analyzer code

%include binpac.pac
%include bro.pac

%extern{
	#include "events.bif.h"
%}

analyzer NTP withcontext {
	connection: NTP_Conn;
	flow:       NTP_Flow;
};

# Our connection consists of two flows, one in each direction.
connection NTP_Conn(bro_analyzer: BroAnalyzer) {
	upflow   = NTP_Flow(true);
	downflow = NTP_Flow(false);
};

%include ntp-protocol.pac

# Now we define the flow:
flow NTP_Flow(is_orig: bool) {

	# ## TODO: Determine if you want flowunit or datagram parsing:

	# Using flowunit will cause the anlayzer to buffer incremental input.
	# This is needed for &oneline and &length. If you don't need this, you'll
	# get better performance with datagram.

	# flowunit = NTP_PDU(is_orig) withcontext(connection, this);
	datagram = NTP_PDU(is_orig) withcontext(connection, this);

};

%include ntp-analyzer.pac