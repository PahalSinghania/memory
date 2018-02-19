defmodule MemoryWeb.PageController do
  use MemoryWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  def game(conn, params) do
    render conn, "game.html", game: params["name"]
  end

  #https://hexdocs.pm/phoenix/controllers.html
  def new(conn, %{"name" => game} = _params) do
    case String.trim(game) do
      "" -> conn
            |> put_flash(:error, "Enter a non empty name")
            |> redirect(to: page_path(conn, :index))
      _  -> redirect(conn, to: "/game/"<>game)
    end
  end
end
