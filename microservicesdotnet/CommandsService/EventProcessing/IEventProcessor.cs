namespace CommandsService.EventProcessing
{
    public interface IEventProcessor
    {
        void ProcessEvent(string msg);
    }
}