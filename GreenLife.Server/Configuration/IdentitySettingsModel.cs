namespace GreenLife.Server.Configuration
{
    public class IdentitySettingsModel
    {
        public string Secret { get; set; }
        public int HourExpiration { get; set; }
        public string Sender { get; set; }
        public string ValidIn { get; set; }
    }
}
