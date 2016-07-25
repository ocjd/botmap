require 'sinatra'

set :bind, '0.0.0.0'
set :port, 3000

  get '/' do
  	@contents = []
  	@contents.push File.read('../Configs/Coords.ini')
	erb :map
  end

  get '/coords' do
  	@coords = File.read('../Configs/Coords.ini')
  	@coords
  end