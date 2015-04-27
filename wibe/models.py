from django.core.handlers.base import BaseHandler

def better_uncaught_exception_emails(self, request, resolver, exc_info):
    """
    Processing for any otherwise uncaught exceptions (those that will
    generate HTTP 500 responses). Can be overridden by subclasses who want
    customised 500 handling.

    Be *very* careful when overriding this because the error could be
    caused by anything, so assuming something like the database is always
    available would be an error.
    """
    from django.conf        import settings
    from django.core.mail   import EmailMultiAlternatives
    from django.views.debug import ExceptionReporter

    # Only send details emails in the production environment.
    if settings.DEBUG == False:
        reporter = ExceptionReporter(request, *exc_info)

        # Prepare the email headers for sending.
        from_    = u"Exception Reporter <ankit@letswibe.com>"
        to_      = from_

        subject  = "Detailed stack trace."

        message = EmailMultiAlternatives(subject, reporter.get_traceback_text(), from_, [to_])
        message.attach_alternative(reporter.get_traceback_html(), 'text/html')
        message.send()

    # Make sure to then just call the base handler.
    return self.original_handle_uncaught_exception(request, resolver, exc_info)

# Save the original handler.
BaseHandler.original_handle_uncaught_exception = BaseHandler.handle_uncaught_exception

# Override the original handler.
BaseHandler.handle_uncaught_exception = better_uncaught_exception_emails