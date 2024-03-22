using Microsoft.AspNetCore.Mvc;
using CapStone1.ViewModels; // 프로젝트 이름에 맞게 네임스페이스 변경

public class AccountController : Controller
{
    public IActionResult Login()
    {
        return View();
    }

    [HttpPost]
    public IActionResult Login(LoginViewModel model)
    {
        // 로그인 처리 로직 (여기서는 생략)
        return View(model);
    }

    public IActionResult Register()
    {
        return View();
    }

    [HttpPost]
    public IActionResult Register(RegisterViewModel model)
    {
        // 회원 가입 처리 로직 (여기서는 생략)
        return View(model);
    }
}