using System.Windows;
using Velopack;

namespace Grimoire.Desktop;

public partial class App : Application
{
    [STAThread]
    public static void Main(string[] args)
    {
        VelopackApp.Build().Run();

        var app = new App();
        app.InitializeComponent();
        app.Run();
    }

    private void Application_Exit(object sender, ExitEventArgs e)
    {
        BackendManager.Instance.Stop();
    }
}
