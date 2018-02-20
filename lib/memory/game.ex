
defmodule Memory.Game do
  def new do
    %{tiles: make_tiles(),
      visible: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      clicks: 0,
      active: 0,
      matches: 0,
      score: 20,
      second: -1,
      first: -1
    }
  end

  def client_view(game) do
    %{ tiles: game.tiles,
       visible: game.visible,
       clicks: game.clicks, 
       score: game.score,
       active: game.active,
       matches: game.matches,
       first: game.first,
       second: game.second
    }
  end

  def guess(state, i) do
    t = state.tiles
    c = state.clicks
    v = state.visible
    a = state.active
    f = state.first
    s = state.second
    m = state.matches
    sc = state.score
    x = Enum.at(t, i)
    y = Enum.at(v, i)

    {c, a, f, s, m, sc} = cond do
      a == 2 -> {c, 0, -1, -1, m, sc}
      a == 0 && f != i && y != 1 -> {c + 1, 1, i, -1, m, sc}
      a == 1 && f != i && Enum.at(t, f) == x && y != 1-> {c + 1, 0, f, i, m + 1, sc + 10}
      a == 1 && f != i && Enum.at(t,f) != x && y != 1 -> {c + 1, 2, f, i, m, sc - 2}
      true -> {c, a, f, s, m, sc} 	
    end

    if Enum.at(t, f) == Enum.at(t,s) && f != -1 do 
       v = List.replace_at(v, f, 1)
       v = List.replace_at(v, i, 1)
    end
    %{state | clicks: c, visible: v, active: a, first: f, second: s, matches: m, score: sc}
    
  end

  def make_tiles do
    tiles = ~w(A B C D E F G H A B C D E F G H)
    Enum.shuffle(tiles)
  end
end
