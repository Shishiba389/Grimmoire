using System.Windows;

namespace Grimoire.Desktop;

public partial class App : Application
{
    [STAThread]
    public static void Main(string[] args)
    {
        var app = new App();
        app.InitializeComponent();
        app.Run();
    }

    private void Application_Exit(object sender, ExitEventArgs e)
    {
        BackendManager.Instance.Stop();
    }
}
