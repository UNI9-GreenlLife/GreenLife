using GreenLife.Business.Interfaces;
using GreenLife.Business.Notifications;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace GreenLife.Server.Controllers
{
    [ApiController]
    public abstract class MainController : ControllerBase
    {
        private readonly INotificator _notificator;

        public MainController(INotificator notificator)
        {
            _notificator = notificator;
        }

        protected bool OperacaoValida()
        {
            return !_notificator.HasNotification();
        }

        /// <summary>
        /// Custom response.
        /// </summary>
        /// <returns>if errors exists, return the errors list</returns>
        protected ActionResult CustomResponse(object result = null)
        {
            if (OperacaoValida())
            {
                return Ok(new
                {
                    success = true,
                    data = result
                }
                );
            }

            return Ok(new
            {
                success = false,
                errors = _notificator.GetNotificationList().Select(e => e.Message)
            });
        }

        /// <summary>
        /// Checks if the model is valid.
        /// </summary>
        protected ActionResult CustomResponse(ModelStateDictionary modelState)
        {
            if (!modelState.IsValid) NotificarErroModelInvalida(modelState);
            return CustomResponse();
        }

        /// <summary>
        /// Notify all the errors to the CustomReponse.
        /// </summary>
        /// <param name="modelState">model that is passing for validation</param>
        protected void NotificarErroModelInvalida(ModelStateDictionary modelState)
        {
            var erros = modelState.Values.SelectMany(e => e.Errors);
            foreach (var erro in erros)
            {
                var erroMsg = erro.Exception == null ? erro.ErrorMessage : erro.Exception.Message;
                NotificarErro(erroMsg);
            }
        }

        protected void NotificarErro(string msg)
        {
            _notificator.Handle(new Notification(msg));
        }
    }
}
