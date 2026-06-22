using System.Windows;

namespace Grimoire.Desktop;

public partial class App : Application
{
    private void Application_Exit(object sender, ExitEventArgs e)
    {
        BackendManager.Instance.Stop();
    }
}
