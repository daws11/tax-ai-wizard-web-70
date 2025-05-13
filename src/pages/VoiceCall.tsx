import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Phone, PhoneOff, Volume2, VolumeX, Clock } from "lucide-react";
import ChatLayout from "@/components/layouts/ChatLayout";

interface CallHistory {
  id: string;
  date: Date;
  duration: string;
  topic: string;
}

const dummyCallHistory: CallHistory[] = [
  {
    id: "1",
    date: new Date("2025-05-13T08:30:00"),
    duration: "15:23",
    topic: "Business Tax Consultation"
  },
  {
    id: "2",
    date: new Date("2025-05-12T14:20:00"),
    duration: "08:45",
    topic: "Property Tax Discussion"
  },
  {
    id: "3",
    date: new Date("2025-05-11T11:00:00"),
    duration: "12:10",
    topic: "Investment Tax Planning"
  }
];

const VoiceCall = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [callHistory] = useState<CallHistory[]>(dummyCallHistory);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isCallActive]);

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setCallDuration(0);
  };

  return (
    <ChatLayout>
      <div className="flex flex-col h-screen max-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          {/* Main call interface */}
          <div className="max-w-4xl mx-auto text-center space-y-8 my-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {isCallActive ? "Call in progress" : "Start a voice call"}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                {isCallActive
                  ? "Speaking with AI Tax Assistant"
                  : "Click the button below to start a voice call"}
              </p>
            </div>

            {/* Call duration */}
            {isCallActive && (
              <div className="text-3xl font-mono text-primary">
                {formatDuration(callDuration)}
              </div>
            )}

            {/* Call controls */}
            <div className="flex gap-6 justify-center">
              <Button
                variant={isMuted ? "destructive" : "outline"}
                size="icon"
                className="h-14 w-14 rounded-full"
                onClick={() => setIsMuted(!isMuted)}
                disabled={!isCallActive}
              >
                {isMuted ? (
                  <MicOff className="h-6 w-6" />
                ) : (
                  <Mic className="h-6 w-6" />
                )}
              </Button>

              <Button
                variant={isCallActive ? "destructive" : "default"}
                size="icon"
                className="h-14 w-14 rounded-full"
                onClick={() => isCallActive ? handleEndCall() : setIsCallActive(true)}
              >
                {isCallActive ? (
                  <PhoneOff className="h-6 w-6" />
                ) : (
                  <Phone className="h-6 w-6" />
                )}
              </Button>

              <Button
                variant={!isSpeakerOn ? "destructive" : "outline"}
                size="icon"
                className="h-14 w-14 rounded-full"
                onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                disabled={!isCallActive}
              >
                {isSpeakerOn ? (
                  <Volume2 className="h-6 w-6" />
                ) : (
                  <VolumeX className="h-6 w-6" />
                )}
              </Button>
            </div>

            {isCallActive && (
              <div className="animate-pulse text-sm text-gray-500 dark:text-gray-400">
                Your voice is being processed...
              </div>
            )}
          </div>

          {/* Call History */}
          {!isCallActive && (
            <div className="max-w-4xl mx-auto mt-16">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Calls
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {callHistory.map((call) => (
                  <div
                    key={call.id}
                    className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        {call.topic}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {call.date.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>{call.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </ChatLayout>
  );
};

export default VoiceCall;