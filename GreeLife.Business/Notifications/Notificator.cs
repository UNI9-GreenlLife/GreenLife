using GreenLife.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GreenLife.Business.Notifications
{
    public class Notificator : INotificator
    {
        private List<Notification> _notifications;

        // ctor to initialize the list<notification>
        public Notificator()
        {
            _notifications = new List<Notification>();
        }

        public List<Notification> GetNotificationList()
        {
            return _notifications;
        }

        public void Handle(Notification notification)
        {
            _notifications.Add(notification);
        }

        public bool HasNotification()
        {
            return _notifications.Any();
        }
    }
}
